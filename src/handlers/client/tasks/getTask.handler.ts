import { di } from "@config";
import { TaskService } from "@services";
import { GetTaskType } from "@schemas/client";
import { AppFastifyHandler, SuccessCode } from "@types";

export const getTaskHandler: AppFastifyHandler<GetTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const task = await taskService.getTask({
    userId: req.session!.userId,
    taskId: req.params.taskId,
  });

  reply.code(SuccessCode.OK).send(task);
};
