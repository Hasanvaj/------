module.exports.config = {
 name: "Ranavs",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Shaon Ahmed",
 description: "Rana VIDEO",
 commandCategory: "group",
 usages: "anime video",
 cooldowns: 5,
 dependencies: {
 'request': '',
 'fs-extra': '',
 'axios': ''
 }
};

module.exports.run = async ({ api, event, args }) => {
 const request = global.nodemodule.request;
 const fs = global.nodemodule["fs-extra"];
 
 
 const messages = [
 "☆《𝗩𝗼𝗶𝗰𝗲 𝗞𝗶𝗻𝗴 𝗥𝗔𝗡𝗔》☆"
 ];
 const randomMessage = messages[Math.floor(Math.random() * messages.length)];
 
 // Video URLs
 const videoUrls = [
 "https://i.imgur.com/ECl213f.mp4",
 "https://i.imgur.com/XedGpHU.mp4",
 "https://i.imgur.com/TUMQUH9.mp4",
 "https://i.imgur.com/MZFRe3f.mp4",
 "https://i.imgur.com/i1JUmKK.mp4",
 "https://i.imgur.com/qBCOxBt.mp4",
 "https://i.imgur.com/nB4OB3f.mp4",
 "https://i.imgur.com/k8iGjbk.mp4",
 "https://i.imgur.com/YbgL91C.mp4",
 "https://i.imgur.com/OtwE474.mp4",
 "https://drive.google.com/uc?id=1h2LUncQ1EY-qPpvu3jBoIwYpzkcCT3-f",
 "https://drive.google.com/uc?id=1h7wXAn7UCoGjki__OC3KCe7P5YtkSL5",
 "https://i.imgur.com/jskWHmp.mp4",
 "https://drive.google.com/uc?id=1oRSrxjBy3TpoJuqvLlr2G-rarEXmpfqb",
 "https://i.imgur.com/ycTkZAA.mp4",
 "https://i.imgur.com/ta5qaMW.mp4",
 "https://i.imgur.com/zFJQY5c.mp4",
 "https://drive.google.com/uc?id=1oUECTBiTT4oOV-fIeRCIngN0RDgHYynY",
 "https://i.imgur.com/XqMNgAg.mp4",
 "https://i.imgur.com/B7GuhKj.mp4"
 ];
 
 const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
 const cachePath = __dirname + "/cache/anime_video.mp4";

 const sendVideo = () => api.sendMessage({
 body: `「 ${randomMessage} 」`,
 attachment: fs.createReadStream(cachePath)
 }, event.threadID, () => fs.unlinkSync(cachePath));

 request(encodeURI(randomVideoUrl))
 .pipe(fs.createWriteStream(cachePath))
 .on("close", () => sendVideo());
};
