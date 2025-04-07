import { di } from "@config";
import { primitive } from "@utils";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { GetTaskType } from "@schemas/client";

export const getTaskHandler: AppFastifyHandler<GetTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.key);

  const task = await taskService.getTask({
    taskId: req.params.taskId,
    authorId: req.session!.userId,
  });

  reply.code(200).send(primitive(task));
};
