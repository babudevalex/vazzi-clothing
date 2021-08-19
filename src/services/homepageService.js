import request from "request";
import chatBotService from "../services/chatBotService";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let setUpMessengerPlatform = (PAGE_ACCESS_TOKEN) => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                "get_started": {
                    "payload": "GET_STARTED"
                },
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "web_url",
                                "title": "Look up Order",
                                "url": "https://vazzi.ubawa.co.ke/checkout",
                                "webview_height_ratio": "full"
                            },
                            
                            {
                                "type": "postback",
                                "title": "Restart this conversation",
                                "payload": "RESTART_CONVERSATION"
                            }
                        ]
                    }
                ],

                "whitelisted_domains": [
                    process.env.SERVER_URL ]
            };

            request({
                "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
            }, (err, res, body) => {
                if (!err) {
                    resolve("setup done!");
                } else {
                    reject(err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseThanks = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let URL = "https://media3.giphy.com/media/Q7y3K35QjxCBa/giphy.gif?cid=ecf05e47095b476d732d1cc437dc8d5f7746edf2d2857ec2&rid=giphy.gif";
            let text = "";
            if (locale === "es") {
                text = `De nada!`;
            } else if (locale === "fr") {
                URL = "https://media1.giphy.com/media/26tk02z9fVjkdTCr6/giphy.gif";
                text = `Vous êtes les bienvenus!`;
            } else if (locale === "de") {
                text = `Bitte!`; //You're welcome
            } else {
                text = `It's a pleasure serving you`;
            }


            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": URL
                    }
                }
            };


            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": text,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW CATEGORIES",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "TALK TO US",
                                "payload": "GUIDE_BOT",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseBye = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let URL = "https://media0.giphy.com/media/8JIRQqil8mvEA/200.webp?cid=ecf05e479d4d36068fd177fd8823a9f0e813bc694e40a567&rid=200.webp";
            let text = "";
            if (locale === "es") {
                text = `Adiós!`;
            } else if (locale === "fr") {
                text = `Au revoir!`;
            } else if (locale === "de") {
                text = `Tschüss!`;
            } else {
                text = `Good Bye.`;
            }


            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": URL
                    }
                }
            };

            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": text,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW CATEGORIES",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "TALK TO US",
                                "payload": "GUIDE_BOT",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = {
                "text" : "Thank you for reaching out, one of our team members will be with you shortly." +
                    "\n\nIn the meantime you can buy any item in our catalogue by clicking the buy now button.  " +
                    "\n\nYou can enter your delivery address and have it delivered to your preferred location."
            };
            
            let response3 = {
                text:  "Our process is seamless thus no need to worry." +
                    "\n\nAdd as many items as you want if you are a bulk shopper." 
                 
            };
            let response5 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Start Over?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW CATEGORIES",
                                "payload": "MAIN_MENU"
                            }
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response3);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response5);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    setUpMessengerPlatform: setUpMessengerPlatform,
    
    sendResponseThanks: sendResponseThanks,
    sendResponseBye: sendResponseBye,
    sendGuideToUseBot: sendGuideToUseBot
};
