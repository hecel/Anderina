const { Client, Message, MessageEmbed } = require("discord.js");
const width = 10;
const height = 6;

module.exports = {
    name: 'game',
    aliases: [],
    description: "first game my friend and me",
  premium: true,
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        let grid = [];
        let player = '😎';
        let wall = '🟦';
        let background = '⬛';

        let playerPos = { x: 3, y: 4 };
        let targetPos = [{ x: randomInteger(2, width-3), y: randomInteger(2, height-3), id: 'box', isWall: false }];
        newLoc('x');

        function generateGame() {
            let str = '';
            for(let i = 0;i < height;i++) {
              for(let j = 0;j < width;j++) {
                if(i == 0 || j == 0 || i == height-1|| j == width-1) {
                  grid[i * width + j] = wall;
                } else {
                  grid[i * width + j] = background;
                }
              }
            }
      
            for(let i = 0;i < height;i++) {
              for(let j = 0;j < width;j++) {
                if(j == playerPos.x && i == playerPos.y) {
                  str += player;
                  continue;
                }
                let flag = true;
                for(let s = 0;s < targetPos.length; s++) {
                  if(j == targetPos[s].x && i == targetPos[s].y) {
                    if(targetPos[s].isWall == true) {
                      str += wall;
                    } else if(targetPos[s].id == 'box') {
                      str += '⬜';
                    } else if(targetPos[s].id == 'x') {
                      str += '❎';
                    }
                    flag = false;
                  }
                }
                if(flag) str += grid[i * width + j];
              }
              str += '\n';
            }
            return str;
        }

        function isLocIn(pos) {
            return targetPos.find(sPos => sPos.x == pos.x && sPos.y == pos.y) !== undefined;
        }

        function newLoc(id) {
            let newPos = { x: 0, y: 0 };
            do {
                newPos = { x: randomInteger(2, width-3), y: randomInteger(2, height-3), id: id, isWall: false };
            } while (isLocIn(newPos));
            targetPos.push(newPos);
        }
        let gameMsg = await message.channel.send(generateGame());
        await gameMsg.react('⬅️');
        await gameMsg.react('➡️');
        await gameMsg.react('⬆️');
        await gameMsg.react('⬇️');
        // await gameMsg.react("🔄");

  
      const filter = (reaction, user) => user.id === message.author.id;
      let collector = gameMsg.createReactionCollector(filter);
  
      let nextX, nextY;
      let targetBox = targetPos.find(x => x.id === 'box');
      let targetX = targetPos.find(x => x.id === 'x');

      collector.on('collect', (reaction, user) => {
        
        switch(reaction.emoji.name) {
          case '⬅️':
            reaction.users.remove(user);
            nextX = playerPos.x - 1;
            if(nextX < 1) {
              return;
            }
            if(nextX == targetX.x && playerPos.y == targetX.y) return;

            if(nextX == targetBox.x && playerPos.y == targetBox.y) {
                if(targetBox.x - 1 < 1) return;
                if(targetBox.x - 1 == targetX.x && targetBox.y == targetX.y) { 
                  targetPos.pop();
                  targetBox.isWall = true;
                }
                targetBox.x = targetBox.x - 1;
            }
            playerPos.x = nextX; 
          break;
  
          case '➡️':
            reaction.users.remove(user);
            nextX = playerPos.x + 1;
            if(nextX > width-2) {
              return;
            }
            if(nextX == targetX.x && playerPos.y == targetX.y) return;

            if(nextX == targetBox.x && playerPos.y == targetBox.y) {
                if(targetBox.x + 1 > width-2) return;
                if(targetBox.x + 1 == targetX.x && targetBox.y == targetX.y) {
                  targetPos.pop(); 
                  targetBox.isWall = true;
                }
                targetBox.x = targetBox.x + 1;
            }
            playerPos.x = nextX;
          break;
  
          case '⬆️':
            reaction.users.remove(user);
            nextY = playerPos.y - 1;
            if(nextY < 1) {
              return;
            }
            if(nextY == targetX.y && playerPos.x == targetX.x) return;

            if(playerPos.x == targetBox.x && nextY == targetBox.y) {
                if(targetBox.y - 1 < 1) return;
                if(targetBox.y - 1 == targetX.y && targetBox.x == targetX.x) {
                  targetPos.pop(); 
                  targetBox.isWall = true;
                }
                targetBox.y = targetBox.y - 1;
            }
            playerPos.y = nextY; 
          break;
  
          case '⬇️':
            reaction.users.remove(user);
            nextY = playerPos.y + 1;
            if(nextY > height-2) {
              return;
            }
            if(nextY == targetX.y && playerPos.x == targetX.x) return;
            
            if(playerPos.x == targetBox.x && nextY == targetBox.y) {
                if(targetBox.y + 1 > height-2) return;
                if(targetBox.y + 1 == targetX.y && targetBox.x == targetX.x) {
                  targetPos.pop(); 
                  targetBox.isWall = true;
                }
                targetBox.y = targetBox.y + 1;
            }
            playerPos.y = nextY;
          break;

          // case "🔄":
          //   reaction.users.remove(user);
          //   gameMsg.edit(generateGame());
          // break;
        }
        gameMsg.edit(generateGame());
        if(targetBox.isWall === true) {
          gameMsg.reactions.removeAll();
          collector.stop();
          gameMsg.edit("**Congrats you win!**");
        }
    });
  }
}

function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}