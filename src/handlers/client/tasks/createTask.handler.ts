import { di } from "@config";
import { TaskService } from "@services";
import { CreateTaskType } from "@schemas/client";
import { AppFastifyHandler, SuccessCode } from "@types";

export const createTaskHandler: AppFastifyHandler<CreateTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const createdTask = await taskService.createTask(req.body);

  reply.code(SuccessCode.CREATED).send({
    alert: true,
    message: "Успешно сохранено",
    task: createdTask,
  });
};
