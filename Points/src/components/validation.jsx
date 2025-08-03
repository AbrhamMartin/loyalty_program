import * as yup from "yup"

export const validateRegisterProduct = yup.object({
    nombre:yup.string().required("El nombre es requerido").min(3, "minimo se requieren 3 caracteres"),
    precio: yup.number().required("El precio es requerido").typeError("Debe ser un numero"),
    descripcion: yup.string().required("La descripcion es requerida").min(10, "Escribe 10 caracteres como minimo")
})