module.exports = function (api) {
    api.cache(true);

    return {
        // 기존의 babel 설정...

        // 추가될 설정
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        fs: 'empty',
                        stream: require.resolve('stream-browserify'),
                        zlib: require.resolve('browserify-zlib'),
                    },
                },
            ],
        ],
    };
};
