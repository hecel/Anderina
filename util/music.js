const { MessageEmbed } = require("discord.js");
const bot = require("../index");
const ytdl = require("ytdl-core");
const ms = require("ms");
const { STAY_TIME } = require("../botconfig/config.json");
const choice = ["⏭️", "⏯️", "🔇", "🔉", "🔊", "🔁", "🔀",  "⏹️"];

async function video_player(guild, song) {
    const song_queue = bot.queue.get(guild.id);

    if(!song_queue) {
        song_queue.voice_channel.leave();
        bot.queue.delete(guild.id);
        song_queue.text_channel.send("Leave the voice channel...");
        setTimeout(function () {
          if (song_queue.connection.dispatcher && guild.me.voice.channel) return;
              
          song_queue.voice_channel.leave();
          song_queue.text_channel.send("Leave the voice channel...");
      }, STAY_TIME * 1000);
      
        bot.queue.loop = false;
        return;
    }
    const stream = ytdl(song.url, { filter: "audioonly" });
    const dispatcher = song_queue.connection.play(stream, { seek: 0 }).on("finish", () => {
        // song_queue.songs.shift();
        // video_player(guild, song_queue.songs[0]);
        if(collector && !collector.ended) collector.stop();
        // song_queue.connection.removeAllListeners("disconnect");

      //   if(song_queue.shuffle) {
      //     let songs = song_queue.songs;
      //         for (let i = songs.length - 1; i > 1; i--) {
      //              let j = 1 + Math.floor(Math.random() * i);
      //              [songs[i], songs[j]] = [songs[j], songs[i]];
      //       }
      //       song_queue.songs = songs;
      //   } else {
      //       song_queue.songs.shift();
      //       video_player(guild, song_queue.songs[0]);
      //   }
      //  if(song_queue.loop) {
      //       const lastSong = song_queue.songs.shift();
      //       song_queue.songs.push(lastSong);
      //       video_player(guild, song_queue.songs[0]);
      //   } else {
      //       song_queue.songs.shift();
      //       video_player(guild, song_queue.songs[0]);
      //   }

      if(song_queue.shuffle) {
        let songs = song_queue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
          let j = 1 + Math.floor(Math.random() * i);
          [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        song_queue.songs = songs;
      }
      if(song_queue.loop) {
        const lastSong = song_queue.songs.shift();
        song_queue.songs.push(lastSong);
        video_player(guild, song_queue.songs[0]);
      }
      song_queue.songs.shift();
      video_player(guild, song_queue.songs[0]);
    });
    dispatcher.setVolumeLogarithmic(song_queue.volume / 100);
    const embed = new MessageEmbed()
    .setTitle("🎶 Now playing")
    .setColor("ffdd4d")
    .setDescription(`[${song.title}](${song.url}) ${song.duration} [request by: ${song_queue.author.author}]`)
    // .addField("**Note: if you click the ⏭️ and nothing happend, you must wait until the song stop, because the scrip kind error.**", `- Riz the creator`)
    .setThumbnail(song.thumbnail)
    .setTimestamp();
    const m = await song_queue.text_channel.send(embed);

    for (const chot of choice) {
      await m.react(chot);
      }
        const filter = (rect, usr) => usr.id === song_queue.author.author.id;
        var collector = m.createReactionCollector(filter, { time: song.duration > 0 ? song.duration * 1000 : 600000 });
  
          collector.on("collect", (reaction, user) => {

          if(!song_queue) return;
            
          switch(reaction.emoji.name) {
            
            case "⏭️":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              // if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");

              if (song_queue) {
                if (song_queue.connection && song_queue.connection.dispatcher) {
                  // End the currently playing song
                  song_queue.connection.dispatcher.end();
                  song_queue.text_channel.send("⏭️ Skipped the song.").then(mes => mes.delete({ timeout: 10000 }));
                } else {
                  console.log("No active dispatcher found.");
                }
              } else {
                console.log("No active song queue found.");
              }              
              break;

            case "⏯️":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
              if(song_queue.playing) {
                song_queue.playing = false;
                song_queue.connection.dispatcher.pause(true);
                song_queue.text_channel.send(`${song_queue.author.author} ⏸️ Paused the music.`).then(mes => mes.delete({ timeout: 10000 }));
              } else {
                song_queue.playing = true;
                song_queue.connection.dispatcher.resume();
                song_queue.text_channel.send(`${song_queue.author.author} ▶️ resumed the music.`).then(mes => mes.delete({ timeout: 10000 }));
              }
              break;

            case "🔇":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");

              if(song_queue.volume <= 0) {
                  song_queue.volume = 100;
                  song_queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
                  song_queue.text_channel.send(`${song_queue.author.author} unmuted the music.`).then(mes => mes.delete({ timeout: 20000 }));
              } else {
                  song_queue.volume = 0;
                  song_queue.connection.dispatcher.setVolumeLogarithmic(0);
                  song_queue.text_channel.send(`${song_queue.author.author} muted the music.`).then(mes => mes.delete({ timeout: 20000 }));
              }
              break;

              case "🔉":
                reaction.users.remove(user).catch(console.error);
                if(song_queue.volume === 0) return;
                if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
                if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
  
                if(song_queue.volume - 10 <= 0) song_queue.volume = 0;
                else song_queue.volume = song_queue.volume - 10;
                song_queue.connection.dispatcher.setVolumeLogarithmic(song_queue.volume / 100);
                song_queue.text_channel.send(`${song_queue.author.author} 🔉 decreased the volume, the volume is now ${song_queue.volume}`).then(mes => mes.delete({ timeout: 20000 }));
                break;

            case "🔊":
              reaction.users.remove(user).catch(console.error);
              if(song_queue.volume === 100) return;
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
      
              if(song_queue.volume + 10 >= 100) song_queue.volume = 100;
              else song_queue.volume = song_queue.volume + 10;
              song_queue.connection.dispatcher.setVolumeLogarithmic(song_queue.volume / 100);
              song_queue.text_channel.send(`${song_queue.author.author} 🔊 increased the volume, the volume is now ${song_queue.volume}`).then(mes => mes.delete({ timeout: 20000 }));
              break;

            case "🔁":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
  
              if(song_queue.loop) {
                song_queue.loop = false;
                song_queue.text_channel.send("🔁 Loop is  now **off**").then(mes => mes.delete({ timeout: 10000 }));
              } else {
                song_queue.loop = true;
                song_queue.text_channel.send("🔁 Loop is now **on**").then(mes => mes.delete({ timeout: 10000 }));
              }
              break;

            case "🔀":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
              
              if(song_queue.shuffle) {
                bot.queue.shuffle = false;
                song_queue.text_channel.send("🔀 Shuffle is  now **off**").then(mes => mes.delete({ timeout: 10000 }));
              } else {
                song_queue.shuffle = true;
                song_queue.text_channel.send("🔀 Shuffle is now **on**").then(mes => mes.delete({ timeout: 10000 }));
              }
              break;
            
            case "⏹️":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
              
              if (song_queue) {
                if (song_queue.connection && song_queue.connection.dispatcher) {
                  // End the currently playing song
                  song_queue.connection.dispatcher.end();
                  bot.queue.delete();
                  song_queue.text_channel.send("🛑 Stopped the song.").then(mes => mes.delete({ timeout: 10000 }));
                } else {
                  console.log("No active dispatcher found.");
                }
              } else {
                console.log("No active song queue found.");
              }              
              break;

            case "🗑️":

              reaction.users.remove(user).catch(console.error);
              
              m.delete();
              song_queue.text_channel.send("Successfully deleted the message").then(x => x.delete({ timeout: 10000 }));

              collector.stop();
              break;
              
            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });

// let time = ms("3s");

        setTimeout(() => {
          collector.on("end", () => {
          m.reactions.removeAll().catch(console.error);
            if(m && !m.deleted) {
                m.delete({ timeout: song.duration }).catch(console.error);
            }
        });
        }, song.duration);
}

module.exports = video_player;