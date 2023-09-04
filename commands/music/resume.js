module.exports = {
    name: "resmu",
    aliases: ["res"],
    discontinue: false,
    run: async(bot, message, args) => {
      const song_queue = await bot.queue.get(message.guild.id);
  
      if(song_queue.playing === false) {
        song_queue.playing = true;
                      song_queue.connection.dispatcher.resume();
                      song_queue.text_channel.send(`${song_queue.author.author} ▶️ resumed the music.`);
      }
    }
  }