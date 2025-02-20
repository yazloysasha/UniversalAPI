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
    userId: req.session!.userId,
    taskId: req.params.taskId,
  });

  reply.code(200).send({
    alert: true,
    message: req.i18n.t("swagger.messages.DELETED"),
    taskId: req.params.taskId,
  });
};
