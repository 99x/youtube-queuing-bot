'use strict'

const fs = require('fs')
const youtubedl = require('youtube-dl');
const Downloader = function () { };




Downloader.prototype.addl = function addl(url, fileName) {
    let video = youtubedl(url);
    video.on('info', function (info) {
        let file = path.join(_dirname, fileName + '' + info._filename);
        video.pipe(fs.createWriteStream(file));
    })
}

