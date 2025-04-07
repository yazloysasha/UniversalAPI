import { di } from "@config";
import { primitive } from "@utils";
import { TaskService } from "@services";
import { AppFastifyHandler } from "@types";
import { CreateTaskType } from "@schemas/client";

export const createTaskHandler: AppFastifyHandler<CreateTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.key);

  const createdTask = await taskService.createTask({
    authorId: req.session!.userId,
    ...req.body,
    deadline: req.body.deadline ? new Date(req.body.deadline) : null,
  });

  reply.code(201).send({
    message: req.i18n.t("swagger.messages.SAVED"),
    task: primitive(createdTask),
  });
};
