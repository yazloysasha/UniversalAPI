import { di } from "@/config/DIContainer";
import { primitive } from "@/utils/primitive";
import { TaskService } from "@/services/task";
import { GetTaskType } from "@/schemas/client";
import { AppFastifyHandler } from "@/types/shared";

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
