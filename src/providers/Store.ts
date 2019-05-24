export interface FeatureToggles {
  [key: string]: boolean;
}

export interface Store {
  featureToggles: FeatureToggles;
}

export interface Action {
  type: string;
  payload: FeatureToggles;
}

export const initialState = {
  featureToggles: {
    "personopplysninger.arbeidsforhold.liste": false
  }
};

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_FEATURE_TOGGLES":
      return {
        ...state,
        featureToggles: action.payload
      };
    default:
      return state;
  }
};
