import { di } from "@/config/DIContainer";
import { TaskService } from "@/services/task";
import { DeleteTaskType } from "@/schemas/client";
import { AppFastifyHandler } from "@/types/shared";

export const deleteTaskHandler: AppFastifyHandler<DeleteTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.key);

  await taskService.deleteTask({
    taskId: req.params.taskId,
    authorId: req.session!.userId,
  });

  reply.code(200).send({
    message: req.i18n.t("swagger.messages.DELETED"),
    taskId: req.params.taskId,
  });
};
