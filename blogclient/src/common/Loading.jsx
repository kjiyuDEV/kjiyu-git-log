import React from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
    const { isLoading } = useSelector((state) => {
        console.log(state);
        return {
            isLoading: state.loading.isLoading,
        };
    });
    return isLoading ? (
        <div className="loading-wrap">
            <div className="loadingio-spinner-ellipsis-eu6brnil9u9">
                <div className="ldio-l68e45yuhc">
                    <div className="loading loading1"></div>
                    <div className="loading loading2"></div>
                    <div className="loading loading3"></div>
                    <div className="loading loading4"></div>
                    <div className="loading loading5"></div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Loading;
