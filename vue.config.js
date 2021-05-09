module.exports = {
    publicPath: "/",
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].template = "./public/index.html";
            return args;
        });
    },
    pwa: {
        name: "LolIOs",
        short_name: "LolIOs",
        iconPaths: {
            favicon512: "favicon/android-chrome-512x512.png",
            favicon192: "favicon/android-chrome-192x192.png",
            favicon32: "favicon/favicon-32x32.png",
            favicon16: "favicon/favicon-16x16.png",
            appleTouchIcon: "favicon/apple-touch-icon.png",
            maskIcon: null,
            msTileImage: null,
        },
        lang: "en",
        start_url: "/",
        scope: "/",
        theme_color: "#ec4899",
        background_color: "#ffffff",
        display: "standalone",
        related_applications: [],
        prefer_related_applications: false,

        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: "src/registerServiceWorker.js",
            // ...other Workbox options...
        },
    },
};
