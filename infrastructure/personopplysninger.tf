variable "client_secret" {}
variable "app_name" {}



provider "azurerm" {
  version = "1.31.0"
  subscription_id = "b6973fea-af6a-499c-9502-66bb7b11892f"
  tenant_id = "966ac572-f5b7-4bbe-aa88-c76419c0f851"
  client_id = "bb1f59d6-e80f-4e18-96cf-6813b13ed22c"
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
    name              = "${var.app_name}-prepod"
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
    name              = "${var.app_name}-function"
    host_name         = "${azurerm_function_app.functionapp.default_hostname}"
  }

  origin_path         = "/api/dekorator"
  origin_host_header  = "${azurerm_function_app.functionapp.name}.azurewebsites.net"
  querystring_caching_behaviour = "NotSet"
}