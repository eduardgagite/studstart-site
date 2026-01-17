export type RegistrationField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "date";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export const registrationFields: RegistrationField[] = [
  {
    id: "fullName",
    label: "ФИО",
    type: "text",
    required: true,
    placeholder: "Иванова Алина Сергеевна",
  },
  {
    id: "faculty",
    label: "Факультет",
    type: "text",
    required: true,
    placeholder: "Экономический",
  },
  {
    id: "group",
    label: "Группа",
    type: "text",
    required: true,
    placeholder: "ЭК-101",
  },
  {
    id: "phone",
    label: "Телефон",
    type: "tel",
    required: true,
    placeholder: "+7 999 000-00-00",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "name@example.com",
  },
  {
    id: "about",
    label: "Коротко о себе",
    type: "textarea",
    placeholder: "Чем увлекаешься? Что ждешь от форума?",
  },
];
