import { di } from "@config";
import { primitive } from "@utils";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { EditTaskType } from "@schemas/client";

export const editTaskHandler: AppFastifyHandler<EditTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const updatedTask = await taskService.editTask({
    userId: req.session!.userId,
    taskId: req.params.taskId,
    ...req.body,
  });

  reply.code(200).send({
    alert: true,
    message: req.i18n.t("swagger.messages.SAVED"),
    task: primitive(updatedTask),
  });
};
