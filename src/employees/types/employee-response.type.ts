import { ResponseData } from "../../utils/types/api-response.type";
import { Employee } from "../entities/employee.entity";
import { Employee_Saving } from "../entities/employee_saving.entity";

export type EmployeeResponse = ResponseData<Employee>

export type EmployeeSavingResponse = ResponseData<Employee_Saving>
