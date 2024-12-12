import { di } from "@config";
import { TaskService } from "@services";
import { GetTasksType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const getTasksHandler: AppFastifyHandler<GetTasksType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const { totalSize, tasks } = await taskService.getTasks({
    pagination: req.query,
  });

  reply.code(SuccessCode.OK).send({ totalSize, items: tasks });
};
