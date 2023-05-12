import { useEffect } from 'react';
import { HTTPError } from 'components/error/Error';
import { useStore } from 'store/Context';
import { fetchFeatureToggles } from 'clients/apiClient';
import { FeatureToggles } from 'store/Store';

export type FetchFeatureToggles = { data: FeatureToggles } & ({ status: 'LOADING' } | { status: 'RESULT' } | { status: 'ERROR'; error: HTTPError });

interface Props {
    children: JSX.Element;
}

const FT = (props: Props) => {
    const [{ featureToggles }, dispatch] = useStore();

    useEffect(() => {
        if (featureToggles.status === 'LOADING') {
            fetchFeatureToggles(featureToggles.data)
                .then((res) =>
                    dispatch({
                        type: 'SETT_FEATURE_TOGGLES',
                        payload: res as FeatureToggles,
                    })
                )
                .catch((error: HTTPError) => console.error(`Failed to fetch feature toggles - ${error.code} ${error.text}`));
        }
    }, [featureToggles, dispatch]);

    return <>{props.children}</>;
};

export default FT;
