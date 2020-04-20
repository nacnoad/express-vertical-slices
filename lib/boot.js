var express = require('express');
var path = require('path');
const {
    readdirSync
} = require('fs');

const featuresFolderName = 'features';
const controllerBaseName = 'controller';

module.exports = function (parent) {

    const getFeatureFolders = () =>
        readdirSync(path.join(__dirname, '..', featuresFolderName), {
            withFileTypes: true
        })
        .filter(dir => dir.isDirectory())
        .map(dir => dir.name);

    var features = getFeatureFolders();

    features.forEach(feature => {
        var app = express();
        var router = require(path.join('..', featuresFolderName, feature, controllerBaseName));
        app.set('views','./features/'+feature);
        app.use('/' + feature, router);
        parent.use(app);
    });
    
};