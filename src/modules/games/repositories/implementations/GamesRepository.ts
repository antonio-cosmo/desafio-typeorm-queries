import { createQueryBuilder, getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder()
      .where(`title ILIKE '%${param}%'`)
      .getMany()
      // Complete usando query builder
    return games
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(id) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
 
    const usersByGameId = await this.repository.createQueryBuilder("games")
    .leftJoinAndSelect("games.users", "users")
    .where("games.id = :id", { id })
    .getOne()

    if(usersByGameId) return usersByGameId.users;

    return []
  }
}
