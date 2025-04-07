import { di } from "@config";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { DeleteTaskType } from "@schemas/client";

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
