const autoDeployment =  require("auto-deployment-web");
const path =  require("path");
autoDeployment.upload.dev(path.resolve(__dirname, './target/debug/'));
