import { Task } from "@/entities/task";
import { Session, User } from "@/entities/user";

/**
 * Сущности операционной базы данных
 */
const entities = [Task, User, Session];

export default entities;
