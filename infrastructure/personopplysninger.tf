variable "client_secret" {}
variable "app_name" {}
variable "dekorator_hostname" {}
variable "subscription_id" {}
variable "tenant_id" {}
variable "client_id" {}




provider "azurerm" {
  version = "1.31.0"
  subscription_id = "${var.subscription_id}"
  tenant_id = "${var.tenant_id}"
  client_id = "${var.client_id}"
  client_secret = "${var.client_secret}"
}

resource "azurerm_resource_group" "resourcegroup" {
  name     = "rg-${var.app_name}"
  location = "northeurope"
}

resource "azurerm_storage_account" "storageaccount" {
  name                     = "sa${var.app_name}"
  resource_group_name      = "${azurerm_resource_group.resourcegroup.name}"
  location                 = "northeurope"
  account_tier             = "Standard"
  account_replication_type = "RAGRS"
  account_kind             = "StorageV2"
  access_tier              = "Hot"

  provisioner "local-exec" {
    command = <<EOF
    az storage blob service-properties update \
      --subscription "${var.subscription_id}" \
      --account-name "${azurerm_storage_account.storageaccount.name}" \
      --static-website \
      --index-document index.html
    EOF
  }

}

resource "azurerm_storage_container" "storagecontainer" {
  name                  = "sc-${var.app_name}"
  resource_group_name   = "${azurerm_resource_group.resourcegroup.name}"
  storage_account_name  = "${azurerm_storage_account.storageaccount.name}"
  container_access_type = "container"
}


resource "azurerm_cdn_profile" "cdnprofile" {
  name                = "cdn-${var.app_name}"
  location            = "northeurope"
  resource_group_name = "${azurerm_resource_group.resourcegroup.name}"
  sku                 = "Premium_Verizon"
}

resource "azurerm_cdn_endpoint" "blobendpoint" {
  name                = "${var.app_name}-q"
  profile_name        = "${azurerm_cdn_profile.cdnprofile.name}"
  location            = "${azurerm_resource_group.resourcegroup.location}"
  resource_group_name = "${azurerm_resource_group.resourcegroup.name}"

  origin {
    name              = "origin-${var.app_name}"
    host_name         = "${azurerm_storage_account.storageaccount.name}.blob.core.windows.net"
  }

  origin_path         = "/${azurerm_storage_container.storagecontainer.name}"
  origin_host_header  = "${azurerm_storage_account.storageaccount.name}.blob.core.windows.net"
  querystring_caching_behaviour = "NotSet"

}

resource "azurerm_cdn_endpoint" "functionendpoint" {
  name                = "${var.app_name}-function"
  profile_name        = "${azurerm_cdn_profile.cdnprofile.name}"
  location            = "${azurerm_resource_group.resourcegroup.location}"
  resource_group_name = "${azurerm_resource_group.resourcegroup.name}"

  origin {
    name              = "function-${var.app_name}"
    host_name         = "${var.dekorator_hostname}.azurewebsites.net"
  }

  origin_host_header  = "${var.dekorator_hostname}.azurewebsites.net"
  querystring_caching_behaviour = "NotSet"
}