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

  const { totalSize, tasks } = await taskService.getTasks({
    pagination: req.query,
    authorId: req.session!.userId,
    filter: req.query,
    sort: req.query,
  });

  reply.code(200).send({
    totalSize,
    items: primitive(tasks),
  });
};
