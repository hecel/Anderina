module.exports = {
    name: "pause",
    aliases: [],
    discontinue: false,
    run: async(bot, message, args) => {
      const song_queue = await bot.queue.get(message.guild.id);
  
      if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
                if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
  
                if(song_queue.playing) {
                    song_queue.playing = false;
                    song_queue.connection.dispatcher.pause(true);
                    song_queue.text_channel.send(`${song_queue.author.author} ⏸️ Paused the music.`);
     }
    }
  }