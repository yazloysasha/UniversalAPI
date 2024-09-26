import { di } from "@config";
import { OID } from "@utils";
import { TaskService } from "@services";
import { GetTaskType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const getTaskHandler: AppFastifyHandler<GetTaskType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const task = await taskService.getTask({
    taskId: OID(req.params.taskId),
  });

  reply.code(SuccessCode.OK);
  reply.send({
    ...task,
    _id: String(task._id),
  });
};
