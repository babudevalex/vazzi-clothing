import request from "request";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Hey ${username} I hope you are having a great day.` };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "SELECT AN OPTION",
                                
                                "image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW CATEGORIES",
                                        "payload": "MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            } ]
                    }
                }
            };

            //send a welcome message
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_second);

            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let sendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "MEN'S WEAR",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/I_AM_NAIROBIAN-_BLACK.png",
								"subtitle": "DISCOVER TSHIRTS, HOODIES, SHADES AND CAPS TO MEET YOUR NEEDS",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "MEN'S WEAR",
                                        "payload": "MEN_WEAR",
                                    }
                                    
                                   
                                ],
                            },

                            {
                               "title": "WOMEN'S WEAR",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2013/06/19-600x800.png",
								"subtitle": "FIND STYLES TO SUIT YOUR MOOD.",
                                "buttons": [
                                    {
                                    
                                        "type": "postback",
                                        "title": "WOMEN'S WEAR",
                                        "payload": "WOMEN_WEAR",
								
                                    }
                                ],
                            },

                            {
                                "title": "TEENAGE WEAR",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/254-Roman-A-1k-600x900.jpg",
								"subtitle": "STYLISH CLOTHES TO COMPLIMENT YOUR LOOK",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "TEENAGE WEAR",
                                        "payload": "TEENAGE_WEAR",
                                    }
                                ],
                            }


                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });

};

let sendMenWear = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                      "title": "TSHIRTS",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
										"subtitle": "MEN'S TSHIRTS",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW MEN TSHIRTS",
                                        "payload": "MEN_TSHIRTS",
                                    }
                                ],
                            },

                            {
                                 "title": "HOODIES",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2016/10/Hoody-600x800.png",
									"subtitle": "MEN'S HOODIES",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW MEN HOODIES",
                                        "payload": "MEN_HOODIES",
                                    }
                                ],
                            },

                            {
                                 "title": "SHADES AND CAPS",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Capes.png",
									"subtitle": "VAZZI WINGS CAPS AND SHADES",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHADES AND CAPS",
                                        "payload": "SHADES_CAPS",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendWomenWear = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                 "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                  "title": "HOODIES",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/Vazzi-Wings_Red-Hoody-600x800.png",
									"subtitle": "SNUG, STYLISH HOODIES",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW WOMEN HOODIES",
                                        "payload": "WOMEN_HOODIES",
                                    }
                                ],
                            },

                            {
                              "title": "SUITS",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2013/06/19-600x800.png",
								"subtitle": "STYLISH JUMPSUITS AND SWEATSUITS",
                                "buttons": [
                                    {
                                         "type": "postback",
                                        "title": "SHOW WOMEN SUITS",
                                        "payload": "WOMEN_SUITS",
										
                                    }
                                ],
                            },

                            {
                                 "title": "SHADES AND CAPS",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Capes.png",
									"subtitle": "VAZZI WINGS CAPS AND SHADES",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHADES AND CAPS",
                                        "payload": "SHADES_CAPS",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
           
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);


            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendTeengeTshirts = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                      "title": "i AM NAIROBIAN",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/I_AM_NAIROBIAN-_BLACK.png",
										"subtitle": "XL,L",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/men/t-shirt/i-am-a-nairobian/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
									"title": "254 ROMAN",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/254-Roman-A-1k-600x900.jpg",
									"subtitle": "XL,L",
                                "buttons": [
                                    {
                                     "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/men/t-shirt/254_t_shirt-design/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "SWOOSH TSHIRT",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-SWOOSH-T-SHIRT-1200-B.jpg",
									"subtitle": "XL,L",
                                "buttons": [
                                    {
								    "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/men/t-shirt/vazzi-swoosh-t-shirt/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
            
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

           
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMenTshirts = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                      "title": "i AM NAIROBIAN",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/I_AM_NAIROBIAN-_BLACK.png",
										"subtitle": "XL,L",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/men/t-shirt/i-am-a-nairobian/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
									"title": "254 ROMAN",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/254-Roman-A-1k-600x900.jpg",
									"subtitle": "XL,L",
                                "buttons": [
                                    {
                                     "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/men/t-shirt/254_t_shirt-design/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "SWOOSH TSHIRT",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-SWOOSH-T-SHIRT-1200-B.jpg",
									"subtitle": "XL,L",
                                "buttons": [
                                    {
								    "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/men/t-shirt/vazzi-swoosh-t-shirt/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let goBackToMainMenu = (sender_psid) => {
    sendMainMenu(sender_psid);
};

let goBackTosendMenWear = (sender_psid) => {
    sendMenWear(sender_psid);
};

let sendTeengeHoodies = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let response = { 

                 "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                        "title": "WING'S HOODIE",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2016/10/Hoody-600x800.png",
										"subtitle": "XL, L",
                                "buttons": [
                                    {
										"type": "web_url",
										"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
										"title": "BUY NOW",
										"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "LENANA BAN",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Lenana_Ban.png",
									"subtitle": "XL,L,M",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                "title": "VAZZI HOODIE",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2016/10/Hoody.png",
								"subtitle": "XL, L, M",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }

			};
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let sendTeenageWear = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                
								"title": "TSHIRTS",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/254-Roman-A-1k-600x900.jpg",
								"subtitle": "CHOOSE FROM A VARIETY OF TSHIRTS TO MATCH YOUR STYLE",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW TSHIRTS",
                                        "payload": "TEENAGE_TSHIRTS",
                                    }
                                ],
                            },

                            {
								 "title": "HOODIES",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2016/10/Hoody-600x800.png",
								"subtitle": "TEENAGE HOODIES",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "TEENAGE HOODIES",
                                        "payload": "TEENAGE_HOODIES",
                                    }
                                ],
                            },

                            {
                               "title": "SHADES AND CAPS",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Capes.png",
								"subtitle": "VAZZI SHADES AND WING'S CAPS",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHADES AND CAPS",
                                        "payload": "SHADES_CAPS",
                                    }
                                ],
                            },

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };

            //send a welcome message
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessageAskingQuality = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "What is your party size ?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "ksh 1000",
                    "payload": "CHEAP",
                }, {
                    "content_type": "text",
                    "title": "ksh 2000",
                    "payload": "FAIR",
                },
                {
                    "content_type": "text",
                    "title": "ksh 3000",
                    "payload": "EXPENSIVE",
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let sendMessageAskingPhoneNumber = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Thank you. And what's the best phone number for us to reach you at?",
            "quick_replies": [
                {
                    "content_type": "user_phone_number",
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let sendMessageDoneReserveTable = async (sender_id) => {
    try {
        let response = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://www.istockphoto.com/photos/thank-you"
                }
            }
        };
        await sendTypingOn(sender_id);
        await sendMessage(sender_id, response);

        //get facebook username
        let username = await getFacebookUsername(sender_id);

        //send another message
        let response2 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": `Done! \nOur  team will contact you as soon as possible ${username}.\n \nWould you like to check our categories?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "SHOW CATEGORIES",
                            "payload": "MAIN_MENU"
                        },
                        {
                            "type":"phone_number",
                            "title":"☎ HOT LINE",
                            "payload":"+254791486069"
                        },
                        {
                            "type": "postback",
                            "title": "START OVER",
                            "payload": "RESTART_CONVERSATION"
                        }
                    ]
                }
            }
        };
        await sendTypingOn(sender_id);
        await sendMessage(sender_id, response2);
    } catch (e) {
        console.log(e);
    }
};

let sendNotificationToTelegram = (user) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                chat_id: process.env.TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `
| --- <b>A new reservation</b> --- |
| ------------------------------------------------|
| 1. Username: <b>${user.name}</b>   |
| 2. Phone number: <b>${user.phoneNumber}</b> |
| 3. Time: <b>${user.time}</b> |
| 4. Quantity: <b>${user.quantity}</b> |
| 5. Date: ${user.date} |
| ------------------------------------------------ |                           
      `
            };

            // Send the HTTP request to the Telegram
            request({
                "uri": `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTalkToUs = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = {
                "text" : "Hey there!"
            };
            let response2 = {
                "text": "One of our Fashonistas will be with you shortly."
            };
            let response3 = {
                "text":  `Feel free to browse our selections while we connect you.`
            };
          

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response3);
   

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};
let sendMessageDefaultForTheBot = (sender_psid) => {
    return new Promise (async (resolve, reject) => {
        try{
          
            //send help template
            let response1 = {
                  "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Hey ${username}you can use the following prompts for navigation or talk to us.`,
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
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
         
            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};

let sendWomenSuits = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response1 = {
                "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "VAZZI WINGS SWEAT SUIT",
                        "image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2013/06/21.png",
                        "subtitle": "L,M,S",
                      
                        "buttons": [
                            {
                                    "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/women/hoodies-sweatshirts/blue-awesome-earrings/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
								  
                            }
                        ],
                    },
                    {
                        "title": "SWEAT SUIT",
                        "image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2013/06/19-600x800.png",
                        "subtitle": "L,M,S",
                      
                        "buttons": [
                            {
                                    "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/women/hoodies-sweatshirts/blue-awesome-earrings/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
                       
                            }
                        ],
                    },
                    {
                        "title": "VAZZI JUMPSUIT",
                        "image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Jampsuit.png",
                        "subtitle": "L,M,S",
                      
                        "buttons": [
                            {
                                    "type": "web_url",
									"url": "https://vazzi.ubawa.co.ke/shop/women/hoodies-sweatshirts/blue-awesome-earrings/",
									"title": "BUY NOW",
									"webview_height_ratio": "tall",
                        
                            }
                        ],
                    }
                ]
            }
		  }
       };
           
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
           

            resolve("done!");
        }catch (e) {
            reject(e);
        }
    })
};

let sendMenHoodies = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response1 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                        "title": "WING'S HOODIE",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2016/10/Hoody-600x800.png",
										"subtitle": "XL, L",
                                "buttons": [
                                    {
										"type": "web_url",
										"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
										"title": "BUY NOW",
										"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "LENANA BAN",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Lenana_Ban.png",
									"subtitle": "XL,L,M",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                "title": "VAZZI HOODIE",
								"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2016/10/Hoody.png",
								"subtitle": "XL, L, M",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
        

            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};

let sendShadesCaps = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response1 = {
                 "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                        "title": "WING'S SHADES",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Shades.png",
										"subtitle": "FAIR TINTED SHADES",
                                "buttons": [
                                    {
										"type": "web_url",
										"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
										"title": "BUY NOW",
										"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                     "title": "VAZZI CAP",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Capes.png",
									"subtitle": "URBAN CAPS",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "SHADES",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2019/02/Shades.png",
									"subtitle": "Vazzi Shades",
                                "buttons": [
                                    {
                                            "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/jackets/sixteen-stone-ring/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
            

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
          

            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};

let sendWomenHoodies = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response1 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                        "title": "WING'S HOODIE",
										"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/Vazzi_Wings_Black-on-White.png",
										"subtitle": "L,M,S",
                                "buttons": [
                                    {
										  "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/women/hoodies-sweatshirts/solitaire-ring-mimanio-classic/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "LENANA BAN",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/Vazzi-Wings_Black-on-Yellow.png",
									"subtitle": "L,M,S",
                                "buttons": [
                                    {
                                                     "type": "web_url",
													"url": "https://vazzi.ubawa.co.ke/shop/women/hoodies-sweatshirts/solitaire-ring-mimanio-classic/",
													"title": "BUY NOW",
													"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            {
                                    "title": "VAZZI HOODIE",
									"image_url": "https://vazzi.ubawa.co.ke/wp-content/uploads/2017/10/Vazzi_Wings_White-on-Black.png",
									"subtitle": "L,M,S",
                                "buttons": [
                                    {
                                           "type": "web_url",
											"url": "https://vazzi.ubawa.co.ke/shop/women/hoodies-sweatshirts/solitaire-ring-mimanio-classic/",
											"title": "BUY NOW",
											"webview_height_ratio": "tall",
                                    }
                                ],
                            },

                            

                            {
                                "title": "Go back",
                                "image_url": " https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO CATEGORIES",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "TALK TO US",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
            
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
         

            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response,
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(res)
                console.log(body)
                if (!err) {
                    console.log("message sent!");
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTypingOn = (sender_psid) => {
    return new Promise ((resolve, reject) => {
       try{
           let request_body = {
               "recipient": {
                   "id": sender_psid
               },
               "sender_action":"typing_on"
           };

           // Send the HTTP request to the Messenger Platform
           request({
               "uri": "https://graph.facebook.com/v6.0/me/messages",
               "qs": { "access_token": PAGE_ACCESS_TOKEN },
               "method": "POST",
               "json": request_body
           }, (err, res, body) => {
               if (!err) {
                   resolve('done!')
               } else {
                   reject("Unable to send message:" + err);
               }
           });
       } catch (e) {
           reject(e);
       }
    });
};

let markMessageSeen = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action":"mark_seen"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        }catch (e) {
          reject(e);
        }
    });
};

let sendResponseGreetings = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let URL = "";
            let text = "";
            if (locale === "es") {
                URL = "https://media0.giphy.com/media/eMBKXi56D0EXC/giphy.gif";
                text = `Hola.`;
            } else if (locale === "fr") {
                URL = "https://media1.giphy.com/media/26tk02z9fVjkdTCr6/giphy.gif";
                text = `Salut.`;
            } else if (locale === "de") {
                URL = "https://media2.giphy.com/media/9VrAK7bVIPOl23G4h3/giphy.gif?cid=ecf05e476622fe3568933b2bce30155a6a0d3fc6b6bfe52b&rid=giphy.gif";
                text = `Hallo.`;
            } else {
                URL = "https://vazzi.ubawa.co.ke/wp-content/uploads/2021/07/VAZZI-CHAMPION-TSHIRT-C-1k.jpg";
                text = `Hey ${username} I hope you are having a great day.`
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

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendMainMenu: sendMainMenu,
    sendMenWear: sendMenWear,
    sendWomenWear: sendWomenWear,
    sendTeengeTshirts: sendTeengeTshirts,
    sendMenTshirts: sendMenTshirts,
    goBackToMainMenu: goBackToMainMenu,
    goBackTosendMenWear: goBackTosendMenWear,
    sendTeengeHoodies: sendTeengeHoodies,
    sendTeenageWear: sendTeenageWear,
    sendMessageAskingQuality: sendMessageAskingQuality,
    sendMessageAskingPhoneNumber: sendMessageAskingPhoneNumber,
    sendMessageDoneReserveTable: sendMessageDoneReserveTable,
    sendNotificationToTelegram: sendNotificationToTelegram,
    sendMessageDefaultForTheBot:sendMessageDefaultForTheBot,
	sendResponseGreetings: sendResponseGreetings,
	sendTalkToUs: sendTalkToUs,
    sendWomenSuits: sendWomenSuits,
    sendMenHoodies: sendMenHoodies,
    sendShadesCaps: sendShadesCaps,
    sendWomenHoodies:sendWomenHoodies,
    markMessageSeen: markMessageSeen,
    sendTypingOn: sendTypingOn,
    sendMessage: sendMessage
};