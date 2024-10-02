import { di } from "@config";
import { OID } from "@utils";
import { TaskService } from "@services";
import { DeleteTaskType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const deleteTaskHandler: AppFastifyHandler<DeleteTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  await taskService.deleteTask({ taskId: OID(req.params.taskId) });

  reply.code(SuccessCode.OK).send({
    alert: true,
    message: "Успешно удалено",
    taskId: req.params.taskId,
  });
};
