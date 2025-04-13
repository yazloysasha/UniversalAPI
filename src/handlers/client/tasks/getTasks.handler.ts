import { di } from "@/config/DIContainer";
import { primitive } from "@/utils/primitive";
import { TaskService } from "@/services/task";
import { GetTasksType } from "@/schemas/client";
import { AppFastifyHandler } from "@/types/shared";

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
