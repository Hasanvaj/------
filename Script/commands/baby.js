const axios = require("axios");

const simsim = "https://simsimi.cyberbot.top";

module.exports.config = {
  name: "baby",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ULLASH",
  description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
  commandCategory: "simsim",
  usages: "[message/query]",
  cooldowns: 0,
  prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const uid = event.senderID;
    const senderName = await Users.getNameUser(uid);
    const query = args.join(" ").toLowerCase();
    
    if (!query) {
      const ran = ["Bolo baby", "hum"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(r, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "simsimi"
          });
        }
      });
    }

    if (["remove", "rm"].includes(args[0])) {
      const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage(" | Use: remove [Question] - [Reply]", event.threadID, event.messageID);
      const [ask, ans] = parts;
      const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (args[0] === "list") {
      const res = await axios.get(`${simsim}/list`);
      if (res.data.code === 200) {
        return api.sendMessage(
          `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\n☠︎︎ Developer: ${res.data.author}`,
          event.threadID,
          event.messageID
        );
      } else {
        return api.sendMessage(`Error: ${res.data.message || "Failed to fetch list"}`, event.threadID, event.messageID);
      }
    }

    if (args[0] === "edit") {
      const parts = query.replace("edit ", "").split(" - ");
      if (parts.length < 3)
        return api.sendMessage(" | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);
      const [ask, oldReply, newReply] = parts;
      const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (args[0] === "teach") {
      const parts = query.replace("teach ", "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage(" | Use: teach [Question] - [Reply]", event.threadID, event.messageID);
      const [ask, ans] = parts;
      const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
      return api.sendMessage(`${res.data.message || "Reply added successfully!"}`, event.threadID, event.messageID);
    }

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
    const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
    
    for (const reply of responses) {
      await new Promise((resolve) => {
        api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: "simsimi"
            });
          }
          resolve();
        }, event.messageID);
      });
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage(`| Error in baby command: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
  try {
    const senderName = await Users.getNameUser(event.senderID);
    const replyText = event.body ? event.body.toLowerCase() : "";
    if (!replyText) return;

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
    const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
    
    for (const reply of responses) {
      await new Promise((resolve) => {
        api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: "simsimi"
            });
          }
          resolve();
        }, event.messageID);
      }
      );
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage(` | Error in handleReply: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    const raw = event.body ? event.body.toLowerCase().trim() : "";
    if (!raw) return;

    const senderName = await Users.getNameUser(event.senderID);
    const senderID = event.senderID;

    if (
      raw === "baby" || raw === "bot" || raw === "bby" ||
      raw === "jannu" || raw === "xan" || raw === "বেপি" || raw === "বট" || raw === "বেবি"
    ) {
      const greetings = [
        "হৃদয়টা পরিষ্কার রাখো আল্লাহর আলো যেন প্রবেশ করতে পারে❤️🥰",
        "লা ইলাহা ইল্লাল্লাহ এই একটি বাক্য বদলে দিতে পারে তোমার চিরকাল। 🕊️",
        "ইসলাম শুধু ধর্ম নয়, এটা পুরো জীবন ব্যবস্থা",
        "যে আল্লাহর উপর ভরসা করে,সে কখনোই একা নয়💖",
        "📖 দিনের শুরু হোক বিসমিল্লাহ দিয়ে, আর শেষ আলহামদুলিল্লাহতে💞💞",
        "🌟 “আল্লাহ যার সাথেই থাকেন, তার পাশে পৃথিবীর সব কিছু থাকুক না থাকুক, সে সফল✍️💝",
        "সবকিছুর চাবিকাঠি আল্লাহর হাতে, তাঁর উপর ভরসা রাখো।😇",
        "নামাজ আমাদের গোনাহ থেকে দূরে রাখে এবং আল্লাহর নিকট নিয়ে যায়💫🫂",
        "যে আল্লাহর কথা মনে রাখে, আল্লাহ তাকে কখনো ভুলে যান না🤩🤗",
        "🌙 “রাতের অন্ধকারে চোখের পানি আল্লাহর কাছে অনেক দামী।🥺💓",
        "📿 “যে অন্তর আল্লাহকে স্মরণ করে, সে কখনো শূন্য থাকে না🫠😊",
        "🌸 “পৃথিবী যখন মুখ ফিরিয়ে নেয়, তখন আল্লাহ বলেন – ‘আমি তো আছি তোমার সাথে🥰 ☁️",
        "😇 পিতা-মাতার খেদমত করা সন্তানের জন্য অবশ্য কর্তব্য। তাদের দোয়া সন্তানের জীবনের সবচেয়ে বড় সম্পদ। তাদের সম্মান করুন, তাদের ভালোবাসুন। ❤️",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও 🌚🥰 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/profile.php?id=100042211012809",
        "“হে রব, আমাকে ক্ষমা করো, আমার ভুলগুলো ঢেকে দাও, আমাকে আবার তোমার পথে ফেরাও🥲🤲",
        "🤲 “رَّبِّ زِدْنِي عِلْمًا”— হে আমার পালনকর্তা আমার এই ভাই বোন দের জ্ঞান বৃদ্ধি দাও।",
        ",শান্তি আর প্রশান্তির ঠিকানা, আমার নামাজ। 🤲
        "“তোমরা উত্তম কথাবার্তা বলো, যাতে মানুষের হৃদয়ে তা দাগ কাটে।” (সূরা আহযাব: ৭০)",
        "“তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি, যে কুরআন শেখে এবং অন্যকে শেখায়।”(সহিহ বুখারি: ৫০২৭)",
        "“সালাত হলো জান্নাতের চাবি🥰",
        "“ইবাদত করো এমনভাবে, যেন তুমি আল্লাহকে দেখতে পাচ্ছো😇😇",
        "আসসালামু আলাইকুম 🤩",
        "“শান্তি পেতে চাইলে বেশি বেশি কোরআন পড়ো ও তাতে আমল করো'📖",
        "“যে ব্যক্তি আল্লাহকে ভয় করে, দুনিয়া তাকে ভয় পায়।” 🕋",
        "“কঠিন সময়ে হতাশ হয়ো না, কারণ আল্লাহ বলেছেন, ‘কষ্টের পরই অবশ্যই স্বস্তি আসে🥰 🌙",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও 😍🫣💕 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/profile.php?id=100042211012809",
        "আসো ভাই ও বোনেরা নামাজ পরি🫂💝",
        "জি বলেন ইসলাম সম্পর্কে কি জানতে চান🥰",
        "সময় থাকতে আল্লাহ পথে আসো সবাই 🤲",
        "হ্যা আমি বট তবে আমি চাই তুমি ইমানদার হও🥰",
        "“দুনিয়ার বিলাসিতা নয়, বরং জান্নাতের সুখ অর্জনের জন্য চেষ্টা করো।” 🌴",
        "নারী প্রেমে অন্ধ না হয়ে,আল্লাহ প্রেমে হও ভাই🥰",
        "আল্লাহ চাইলে তুমি একদিন উত্তম জিনিস পাবে🤩",
        "হুম বলো🥰",
        "আমি ভাগ্যবান বলেই,প্রিয় নবী হযরত মুহাম্মদ (সা:)এর উম্মত❞",
        "ভালো রাখার মালিক আল্লাহ..যেমন আছি আলহামদুলিল্লাহ..!🤗🥀",
        "রিলেশন করলে নামাযের সাথে করুন....!!☺️ইনশাআল্লাহ কোনদিন ও ঠকবেন না....!! 🥀🖤",
        "𝗝𝗮𝗻 𝗮𝘀𝗼 𝗻𝗮𝗺𝗮𝗷 𝗽𝗼𝗿𝗶🙂❤️",
        "চাওয়া যখন আল্লাহর কাছে-পাওয়া তখন নিশ্চিত•❤️🌺",
        "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/profile.php?id=100042211012809",
        "🌻•ছিঁড়ে ফেলুন অতীতের সকল পাপের অধ্যায় ফিরে আসুন রবের
ভালোবাসায়••🖤🥀",
        "আমাকে এতো না ডেকে,আল্লাহ কে ডাকো😊",
        "🌻🌺💚-আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻",
        "আমি এখন বস রানা এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻",
        "_ 🙃যে ব্যক্তি আল্লাহর উপর _প্রবল বিশ্বাস রাখে",
        "🌼বান্দার গুনাহ যত বড়💔আল্লাহর ক্ষমা তার চেয়েও বড়•🌺😘",
        "_ সম্পর্ক হোক হালাল••!!উদ্দেশ্য হোক জান্নাত,,🌺🥀",
        "🥀Mood off•??😔 Don't Listen Song•••!!🚫   😍🥀 Listen "surah Yasin"•💘",
        "আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧",
        "🌺🙃সৃষ্টিকর্তার উপর ভরসা থাকলে          অসম্ভব ও সম্ভব হয়ে যায়.❤️🥀",
        "🌿🌸...ধৈর্য কখনো-মানুষকে-ঠকাই না!!🌸🌿",
        "স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻",
        "→লক্ষে পৌঁছাতে ধৈর্য লাগে🐰🩷",
        "-নিরবতা মানে অহংকার নয়,নিরবতা মানে ধৈর্য😊🥀",
        "বন্ধু যখন বেইমান হয় তখন বন্ধু শব্দটাই বিষাক্ত মনে হয়🥹💔",
        "সময় তোমাকে ধন্যবাদ,কিছু বেইমান বন্ধুর আসল রূপ দেখিয়ে দেওয়ার জন্য 😅😊",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও🌻𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 𝐋𝐈𝐍𝐊 🌻:- https://www.facebook.com/profile.php?id=100042211012809",
        "আল্লাহ আমাকে অনেক ধৈর্য দিয়েছে…তাই কষ্ট গুলা লুকিয়ে হাসতে জানি😊🙂🙂",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/profile.php?id=100042211012809",
        ""হাসবুল্লাহ ওয়া নি'মাল ওয়াকিল"অর্থাৎ আমার জন্য আমার আল্লাহ যথেষ্ট😍",
        "🥀নিজের "গোপন বিষয়"মানুষকে যত কম বলা যায় ততই ভালো.❤️",
        "আমি আল্লাহকে দেখিনি :-/-কিন্তু দেখেছি তার সুন্দর সৃষ্টিকে😍আলহামদুলিল্লাহ 🥰💗",
        "প্রসঙ্গ যখন ধর্মেরতখন আমাদের ইসলামি সেরা...😍",
        "প্রসঙ্গ যখন ধর্মেরতখন আমাদের ইসলামি সেরা...😍",
        "🌼🥀"তুমি আবারও কাঁদবে দোয়া  কবুল হওয়ার আনন্দে"🌺🥀",
        "-চাওয়া যখন আল্লাহর কাছে পাওয়া তখন নিশ্চিত•❤️🌺",
        "I wish🥀আমার জীবন সঙ্গিনী যেন নামাযি হয়•🥰🙈",
        "তাকাই আছো কেন চুমু দিবা-🙄🐸😘",
        "আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇",
        "-আমার গল্পে তোমার নানি সেরা-🙊🙆‍♂️🤗",
        "কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻",
        "দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧",
        "-তাবিজ কইরা হইলেও ফ্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻",
        "-ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻",
        "প্রেম করতে চাইলে বস সাহুর ইনবক্সে চলে যা 😏🐸 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/100001039692046",
        "-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস সাহু ধরতে পারছে না-🐸🥲",
        "-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️",
        "—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂-আমার বস সাহু এর সাথে প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗",
        "—হাজারো লুচ্চা লুচ্চির ভিরে-🙊🥵আমার বস সাহু এক নিস্পাপ ভালো মানুষ-🥱🤗🙆‍♂️",
        "-রূপের অহংকার করো না-🙂❤️চকচকে সূর্যটাও দিনশেষে অন্ধকারে পরিণত হয়-🤗💜",
        "সুন্দর মাইয়া মানেই-🥱আমার বস সাহু'র বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗",
        "এত অহংকার করে লাভ নেই-🌸মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂",
        "-দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি-🙂😿🌸",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও",
        "ইসলামি যেকোনো তথ্য জানতে চাইলে আমার বস রানা ইনবক্সে চলে যাও🤭🤣😼 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/profile.php?id=100042211012809",
        "হুদাই আমারে শয়তানে লারে-😝😑☹️",
        "_যে ব্যক্তি অন্যের জন্য দোয়া করে❤️😍🌼ফেরেশতারা  তার জন্য দোয়া করে🌺",
        "𝗜 𝗟𝗢𝗩𝗘 𝗬𝗢𝗨 𝗔𝗹𝗹𝗮𝗵😘❤️",
        "...!/তার চেহারা ট্যাহঁ ছিল অনেক মায়াবী-কিন্তু সে ছিল চলনাময়ী..!!😔🙂😅",
        "-রাখতে জানলে বিচ্ছেদ অসম্ভব ||💛",
        "~ যত সুন্দর ভাবনা তত সুন্দর মানুষ,, 💞~ চেহারা তো আবরণ মাএ,, 🎀",
        "-ইস কেউ যদি বলতো-🙂-আমার শুধু তোমাকেই লাগবে-💜🌸",
        "সন্মান তাকেই করা উচিত 😒🗿জে সন্মান এর মুল্য বোঝে🌚🥀",
        "-একদিন সে ঠিকই ফিরে তাকাবে-😇-আর মুচকি হেসে বলবে ওর মতো আর কেউ ভালবাসেনি-🙂😅",
        "ধ্বংসের শেষে…. 🙂আমি আবারও উঠে দাড়াঁবো.. 🤙",
        "—সুখ শ|ন্তি অ|ল্লাহর নিয়|মত♡🩷✨",
        "ধৈর্য্যটাই হতে পারে সফলতা༎❤️❤️",
        "কিছু কিছু হারের মধ্যে ওহাসি থাকে🥀🥰🥀",
        "পরিশ্রম হয়তো চেহারা খারাপ করে দিবে কিন্তু ভবিষ্যৎ না🖤🤍"
      ];

      const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
      const mention = {
        body: `@${senderName} ${randomReply}`,
        mentions: [{
          tag: `@${senderName}`,
          id: senderID
        }]
      };

      return api.sendMessage(mention, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "simsimi"
          });
        }
      }, event.messageID);
    }

    if (
      raw.startsWith("baby ") || raw.startsWith("bot ") || raw.startsWith("bby ") ||
      raw.startsWith("jannu ") || raw.startsWith("xan ") ||
      raw.startsWith("বেপি ") || raw.startsWith("বট ") || raw.startsWith("বেবি ")
    ) {
      const query = raw
        .replace(/^baby\s+|^bot\s+|^bby\s+|^jan\s+|^xan\s+|^জান\s+|^বট\s+|^বেবি\s+/i, "")
        .trim();
      if (!query) return;

      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
      
      for (const reply of responses) {
        await new Promise((resolve) => {
          api.sendMessage(reply, event.threadID, (err, info) => {
            if (!err) {
              global.client.handleReply.push({
                name: module.exports.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "simsimi"
              });
            }
            resolve();
          }, event.messageID);
        });
      }
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage(`| Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
  }
};
