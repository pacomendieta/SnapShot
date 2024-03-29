import React from "react"
import Form from "../components/Form"
import { create, act } from "react-test-renderer"

let component;
const props = {
    history: {},
    handleSubmit: jest.fn().mockName("Funcion handleSumbit")
}
props.handleSubmit.mockReturnValue(99)

describe("<Form />", ()=>{
    //Primer caso de prueba
    //  -- empezar con una instancia limpia del componente
    beforeEach( ()=>{
        component = create(<Form {...props} />)
    })

    it ("Renderiza correctamente", ()=>{
        expect(component).toBeDefined();  //componente definido
        expect(component.toJSON().type).toEqual("form") // su tipo sea "form"
        expect(component.root.findByType("input")).toBeDefined() //tenga un hijo "input"
        expect(component.root.findByType("button")).toBeDefined() //tenga un hijo "button"
        expect(component.root.findByType("svg")).toBeDefined() //tenga un hijo "svg"
    })
    it ("El botón enabled si el input no está vacío", async ()=>{
        const form = component.root.findByType("form")
        const input = form.findByType("input")
        const button = form.findByType("button")
        expect(button.props.disabled).toBeTruthy() // que disabled sea true
        expect(button.props.className).toEqual("search-button null") //atributo class inicial

        //act:    simular cambio de valor en el elemento input ejecutando input.onChange()
        //expect: se debe habilitar el boton buscar
        await act( ()=>{
            input.props.onChange( {target:{value: "coche"}})
        })
        expect(button.props.disabled).toBeFalsy()
        expect(button.props.className).toEqual("search-button active")

    })

    it ("Se llama al onSubmit al clicar boton buscar", ()=>{
        const form = component.root.findByType("form")
        form.props.onSubmit("Paco");
        form.props.onSubmit("Pepe");
        form.props.onSubmit("Jose");
        expect(props.handleSubmit).toHaveBeenCalled()
        expect(props.handleSubmit).toHaveBeenCalledTimes(3)
        expect(props.handleSubmit).toHaveBeenCalledWith( "Paco", props.history,"")
    })


})