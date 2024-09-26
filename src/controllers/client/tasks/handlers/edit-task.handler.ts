import { di } from "@config";
import { OID } from "@utils";
import { TaskService } from "@services";
import { EditTaskType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const editTaskHandler: AppFastifyHandler<EditTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const updatedTask = await taskService.editTask({
    taskId: OID(req.params.taskId),
    ...req.body,
  });

  reply.code(SuccessCode.OK).send({
    alert: true,
    message: "Успешно сохранено",
    task: {
      ...updatedTask,
      _id: String(updatedTask._id),
    },
  });
};
