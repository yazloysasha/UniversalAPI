import { di } from "@config";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { ReplaceTasksType } from "@schemas/client";

export const replaceTasksHandler: AppFastifyHandler<ReplaceTasksType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.key);

  await taskService.replaceTasks({
    userId: req.session!.userId,
    tasks: req.body.tasks,
  });

  reply.code(201).send({
    alert: true,
    message: req.i18n.t("swagger.messages.SAVED"),
  });
};
