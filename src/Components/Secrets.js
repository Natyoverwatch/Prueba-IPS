/* CODIGO PARA HABILITAR SELECT CON OTRO SELECT */

const handleChange = (selectedOption) => {
    (selectedOption === "auxiliar") ? setIsAux(true) : setIsAux(false)
}

<Form.Item name="roll" label="Roll">
    <Select
        onChange={handleChange}
        options={[
            {
                value: 'Administrador',
                label: 'Administrador',
            },
            {
                value: 'auxiliar',
                label: 'Auxiliar',
            },
            {
                value: 'revisor',
                label: 'Revisor',
            }
        ]} />
</Form.Item>
{
    <Form.Item
        name="supervisor"
        label="Supervisor"
        hidden={!isAux}>
    <Select
        style={{ width: '100%' }}
    >
        {dataSupervisor.map((read, index) => (
            <Option
                key={index}
                value={read.name}>{read.name}
            </Option>))}
    </Select>
</Form.Item>
}