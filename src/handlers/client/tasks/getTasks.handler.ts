import { di } from "@config";
import { primitive } from "@utils";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { GetTasksType } from "@schemas/client";

export const getTasksHandler: AppFastifyHandler<GetTasksType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const { totalSize, tasks } = await taskService.getTasks({
    userId: req.session!.userId,
    pagination: req.query,
  });

  reply.code(200).send({ totalSize, items: primitive(tasks) });
};
