const { Pool } = require("pg");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `SELECT a.id, a.title, a.performer FROM songs a LEFT JOIN playlistsongs b ON a.id = b.song_id LEFT JOIN playlists c ON b.playlist_id = c.id WHERE b.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;