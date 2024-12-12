import { di } from "@config";
import { TaskService } from "@services";
import { GetTaskType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const getTaskHandler: AppFastifyHandler<GetTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const task = await taskService.getTask({
    taskId: req.params.taskId,
  });

  console.log(task);

  reply.code(SuccessCode.OK).send(task);
};
