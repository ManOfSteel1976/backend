import { EntityRepository, Repository } from "typeorm";
import { GrafitiEntity } from "./grafiti.entity";

@EntityRepository(GrafitiEntity)
export class GrafitiRepository extends Repository<GrafitiEntity> {}