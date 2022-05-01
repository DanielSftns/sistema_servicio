import React from 'react';
import LandingHeader from './LandingHeader';
import {
  Container,
  Text,
  Heading,
  Flex
} from '@chakra-ui/react'

const LandingScreen = () => {
  return (
    <>
      <LandingHeader />
      <Container>
        <Flex
          minH='80vh'
          align="center"
          justify="center"
          direction="column"
        >
          <Heading mb={8}>Servicio Comunitario - Universidad de Oriente</Heading>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae iusto fugiat aliquid excepturi dolorem adipisci non sequi, est deleniti obcaecati repudiandae, repellendus molestiae dolores perferendis quasi unde voluptate? Laborum?</Text>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae iusto fugiat aliquid excepturi dolorem adipisci non sequi, est deleniti obcaecati repudiandae, repellendus molestiae dolores perferendis quasi unde voluptate? Laborum?</Text>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae iusto fugiat aliquid excepturi dolorem adipisci non sequi, est deleniti obcaecati repudiandae, repellendus molestiae dolores perferendis quasi unde voluptate? Laborum?</Text>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae iusto fugiat aliquid excepturi dolorem adipisci non sequi, est deleniti obcaecati repudiandae, repellendus molestiae dolores perferendis quasi unde voluptate? Laborum?</Text>
        </Flex>
      </Container>
    </>
  );
}
 
export default LandingScreen;