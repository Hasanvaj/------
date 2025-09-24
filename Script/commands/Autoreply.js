const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "bot miss you,miss you bot,miss you jan,": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস রানা রে হাঙ্গা করো😶👻😘",
    "bot kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "help": "Prefix de sala",
    "হ্যালো": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "🥰": "ভালোবাসা নামক আবলামি করতে চাইলে বাবু ইনবক্সে যা পাগল ছাগল 🔪😾😾",
    "Bt": "Bolo bou💬,bolo jan🤖,ei to jan ami🤭,tumake miss korchi jan😘, bolo babu💬",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "babu": "রানা ভাই এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Rana Islam☜\nFacebook: https://www.facebook.com/profile.php?id=100042211012809\nWhatsApp: +8801878840655",
    "admin": "He is Rana 𝐈𝐬𝐥𝐚𝐦 তাকে সবাই  বাবু হিসেবে চিনে😘☺️",
    "Rana babu": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল😾🤖",
    "assalamualaikum": "𝗪𝗮𝗹𝗮𝗸𝘂𝗺 𝗮𝘀𝘀𝗮𝗹𝗮𝗺💖প্রিয় মেম্বার",
    "zx": "https://github.com/shahadat-sahu/SHAHADAT-CHAT-BOT.git",
    "bot kiss me,": "মেয়ে হলে বাবু কে দাও ছেলে হলে সামনে তো সর🔪😾 🤭,umma too jan💋,uff sei shad🥵",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস রানা রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you jan,bot i love you,i Love bol,i Love you,": "মেয়ে হলে আমার বস রানা এর ইনবক্সে এখুনি গুঁতা দিন🫢😻,i Love too jan,i love you bby,Love you😘",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami babu": "হ্যা বস কেমন আছেন..?☺️",
    "sala bot": "তোর বোন আমার বউ তুই আমার শালা..!!🌚⛏️,পাগল ছাগল ইগনোর😒💬,তোর বোনকে উম্মা💋",
    "tor name ki": "MY NAME IS ─꯭─⃝[ / ] • BABU ☢️_𖣘 -𝐁𝐎𝐓 ⚠️,amar boss name Rana Islam💖🌺",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bot ja to,": "রাগ করে না ভাই বন আমি তো রোবট তাই এমন হচ্ছে 🥰,আমি তো তোমাদের হাসানো জন্য আসছি🤖💬,আমি চলে গেলে যদি ভালো হয় তাহলে কিক দাও🤖💬",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "😁": "হাসলে তোরে মফিজে মতো লাগে..!🌚🤣",
    "bot biye korbi": "ভালোবাসা নামক আবলামী করতে চাইলে Boss বাবু এর ইনবক্সে গুতা দিন 😘,ami ki tore bolchi amj valo, জান রাত ১২টা পরে কল দিও🤦‍♂️🐸,সর আবাল😾",
    "bot ki koro": "তোমার কথা ভাবতে ছি জানু",
    "bot koi": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈,এতো ডাকো কেন প্রেমে পরছো নাকি🙊🤖,চলে আাছি জান বলো,এইতো জান আমি"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
