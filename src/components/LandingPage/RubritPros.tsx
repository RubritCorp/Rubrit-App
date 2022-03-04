import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { Check } from 'phosphor-react';
import { ReactElement } from 'react';

interface FeatureProps {
    text: string;
    icon?: ReactElement;
}

const Feature = ({ text, icon }: FeatureProps) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

const NearProfesionals: React.FC = () => {
    return (
        <Container maxW={"container.xl"} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
                <Stack spacing={4}>
                    <Heading>La ayuda que necesitas al alcance de tus manos</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        Encontra la persona que mas se ajusta al trabajo que estas necesitando hacer, con el plus de saber que es el mejor en su rubro certificado por nuestra comunidad.
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={
                                <Check size={40} color="#6bdaae" weight="duotone" />
                            }
                            
                            text={'Compara precios, ratings y reseñas del trabajo que estas buscando'}
                        />
                        <Feature
                            icon={<Check size={40} color="#6bdaae" weight="duotone" />}
                            
                            text={'Elegi y conecta con la persona indicada para hacer el trabajo'}
                        />
                        <Feature
                            icon={
                                <Check size={40} color="#6bdaae" weight="duotone" />
                            }
                          
                            text={'Agenda a tus favoritos para volver a contactarlos cuando los necesites'}
                        />
                    </Stack>
                </Stack>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={
                            'https://img.freepik.com/foto-gratis/mujer-carpintera-sierra-metales-cortando-tablas-taller_108611-18.jpg'
                        }
                        objectFit={'cover'}
                    />
                </Flex>
            </SimpleGrid>
        </Container>

    )
}

export default NearProfesionals;