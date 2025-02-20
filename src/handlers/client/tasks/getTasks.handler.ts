import { di } from "@config";
import { primitive } from "@utils";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { GetTasksType } from "@schemas/client";

export const getTasksHandler: AppFastifyHandler<GetTasksType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.key);

  const tasks = await taskService.getTasks({
    userId: req.user!.id,
    pagination: req.query,
  });

  reply.code(200).send({
    totalSize: req.user!.tasksCount,
    items: primitive(tasks),
  });
};
