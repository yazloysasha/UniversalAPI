import { di } from "@config";
import { primitive } from "@utils";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { GetTaskType } from "@schemas/client";

export const getTaskHandler: AppFastifyHandler<GetTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const task = await taskService.getTask({
    userId: req.session!.userId,
    taskId: req.params.taskId,
  });

  reply.code(200).send(primitive(task));
};
