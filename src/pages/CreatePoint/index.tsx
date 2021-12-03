import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import './styles.css';
import logo from '../../assets/logo.svg';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br></br>ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="Whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="Whatsapp"
                                id="Whatsapp"
                            />
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                   
                    <MapContainer center={[-19.935394,-44.0103829]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-19.935394,-44.0103829]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma Cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste" />
                            <span>Lampadas</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/papeis-papelao.svg" alt="Teste" />
                            <span>Papeis e Papelão</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste" />
                            <span>Pilhas e Baterias'</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/eletronicos.svg" alt="Teste" />
                            <span>Resíduos Eletrônicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/organicos.svg" alt="Teste" />
                            <span>Resíduos Orgânicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                            <span>Óleo de Cozinha</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>
        </div>
    )
};
export default CreatePoint;