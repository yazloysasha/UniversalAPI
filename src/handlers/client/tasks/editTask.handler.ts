import { di } from "@/config/DIContainer";
import { primitive } from "@/utils/primitive";
import { TaskService } from "@/services/task";
import { EditTaskType } from "@/schemas/client";
import { AppFastifyHandler } from "@/types/shared";

export const editTaskHandler: AppFastifyHandler<EditTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.key);

  const updatedTask = await taskService.editTask({
    taskId: req.params.taskId,
    authorId: req.session!.userId,
    ...req.body,
    deadline: req.body.deadline
      ? new Date(req.body.deadline)
      : req.body.deadline === null
      ? null
      : undefined,
  });

  reply.code(200).send({
    message: req.i18n.t("swagger.messages.SAVED"),
    task: primitive(updatedTask),
  });
};
