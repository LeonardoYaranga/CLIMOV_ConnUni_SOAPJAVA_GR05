import { ConUnit } from '../models/ConUnit';
import { User } from '../models/User';

export class SOAPJAVAController {
  private BASE_URL_LOGIN =
    'http://192.168.137.1:8080/WS_ConUni_SOAPJAVA_GR05/login';
  private BASE_URL_CONUNI =
    'http://192.168.137.1:8080/WS_ConUni_SOAPJAVA_GR05/WSConUni';

  public async auth(user: User): Promise<boolean> {
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.rivera.edu.ec/">
         <soapenv:Header/>
         <soapenv:Body>
            <ws:auth>
               <user>${user.getUsername()}</user>
               <password>${user.getPassword()}</password>
            </ws:auth>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
      const response = await fetch(this.BASE_URL_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          SOAPAction: 'auth',
        },
        body: soapBody,
      });

      const textResponse = await response.text();

      // Buscar el valor dentro de <return>...</return>
      const match = textResponse.match(/<return>(.*?)<\/return>/);
      const result = match ? match[1].trim() : 'false';

      return result === 'true';
    } catch (error) {
      console.error('Error en la solicitud SOAP:', error);
      return false;
    }
  }

  public async getSupportedTypes(): Promise<string[]> {
    const xmlRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.rivera.edu.ec/">
         <soapenv:Header/>
         <soapenv:Body>
            <ws:getSupportedTypes/>
         </soapenv:Body>
      </soapenv:Envelope>`;

    try {
      const response = await fetch(this.BASE_URL_CONUNI, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          SOAPAction: 'getSupportedTypes',
        },
        body: xmlRequest,
      });

      const text = await response.text();

      // Extraer múltiples <return>...</return>
      const matches = text.matchAll(/<return>(.*?)<\/return>/g);
      const values = Array.from(matches, m => m[1]);
      return values;
    } catch (error) {
      console.error('Error en getSupportedTypes():', error);
      return [];
    }
  }

  public async getTypeInfo(type: string): Promise<string[]> {
    const xmlRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.rivera.edu.ec/">
        <soapenv:Header/>
        <soapenv:Body>
          <ws:getSupportedUnits>
            <tipo>${type}</tipo>
          </ws:getSupportedUnits>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const response = await fetch(this.BASE_URL_CONUNI, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
      },
      body: xmlRequest,
    });

    const text = await response.text();

    // Extraer todas las etiquetas <return> del XML de respuesta
    const matches = Array.from(text.matchAll(/<return>(.*?)<\/return>/g));
    return matches.map(m => m[1]);
  }

  public async convertUnit(conUnit: ConUnit): Promise<number> {
    const xmlRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.rivera.edu.ec/">
      <soapenv:Header/>
      <soapenv:Body>
        <ws:convertUnit>
          <tipo>${conUnit.getTipo()}</tipo>
          <value>${conUnit.getValue()}</value>
          <inUnit>${conUnit.getInUnit()}</inUnit>
          <outUnit>${conUnit.getOutUnit()}</outUnit>
        </ws:convertUnit>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

    const response = await fetch(this.BASE_URL_CONUNI, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml;charset=UTF-8' },
      body: xmlRequest,
    });

    const text = await response.text();

    // Extraer el valor dentro de <return>...</return>
    const match = text.match(/<return>(.*?)<\/return>/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    } else {
      throw new Error(
        'No se encontró valor de conversión en la respuesta SOAP',
      );
    }
  }
}
