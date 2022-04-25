import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



function BankCard({ bank, deleteBank, onEditButtonClick, withButtons }) {

  const onDeleteButtonClick = (id) => {
    deleteBank(id)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bank.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interest rate: {bank.interestRate}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Maximum loan: {bank.maximumLoan}USD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Minimum down payment: {bank.minimumDownPayment}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loan term: {bank.loanTerm} Years
        </Typography>
      </CardContent>
      {withButtons && <CardActions>
        <Button
          variant="contained"
          size="small"
          type="submit"
          color="primary"
          onClick={() => onDeleteButtonClick(bank.id)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          size="small"
          type="submit"
          color="primary"
          onClick={() => onEditButtonClick(bank.id)}
        >
          Edit
        </Button>
      </CardActions>}
    </Card>
  );
}

export default BankCard;
