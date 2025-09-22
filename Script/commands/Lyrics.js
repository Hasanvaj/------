const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "Lyrics",
  version: "2.0.1",
  hasPermssion: 0,
  credits: "Jehad Joy",
  description: "Fetch lyrics of a song",
  commandCategory: "media",
  usages: "lyrics [song name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  try {
    const songTitle = args.join(" ");
    if (!songTitle) {
      return api.sendMessage("🔍 Please provide a song name! Usage: lyrics <song name>", event.threadID);
    }

    const response = await axios.get(
      `https://lyricsapi.fly.dev/api/lyrics?q=${encodeURIComponent(songTitle)}`
    );

    const result = response.data && response.data.result ? response.data.result : null;
    if (!result || !result.lyrics) {
      return api.sendMessage(`❌ Sorry, I couldn't find any lyrics for "${songTitle}".`, event.threadID);
    }

    const maxChars = 4096;
    const lyrics = result.lyrics.length > maxChars 
      ? result.lyrics.slice(0, maxChars - 3) + "..." 
      : result.lyrics;

    const message = 
      `❏ Title: ${result.title || songTitle}\n` +
      `❏ Artist: ${result.artist || "Unknown"}\n\n` +
      `❏ Lyrics:\n${lyrics}`;

    return api.sendMessage(message, event.threadID);

  } catch (err) {
    console.error(err);
    return api.sendMessage(
      `❌ An error occurred while fetching the lyrics for "${args.join(" ")}".`,
      event.threadID
    );
  }
};
